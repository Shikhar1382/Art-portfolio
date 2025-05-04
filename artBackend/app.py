from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import cloudinary
import cloudinary.uploader
import cloudinary.api
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://art-portfolio-eta.vercel.app",
    "https://art-portfolio-git-main-shikhar-seths-projects.vercel.app",
    "https://shikhar-art-shikhar-seths-projects.vercel.app/" # ✅ your Vercel frontend
]}}, supports_credentials=True)

# public id of watermark = okbynyyzhxirpgvbnoug
# public id watermark 45% opacity = jdjddhybnutmcfxexwpd

cloudinary.config(
    cloud_name=os.environ.get("CLOUDINARY_CLOUD_NAME"),
    api_key=os.environ.get("CLOUDINARY_API_KEY"),
    api_secret=os.environ.get("CLOUDINARY_API_SECRET"),
    secure=True
)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///shikhar.db'

# Database setup
db = SQLAlchemy(app)

#creating a schema class for database
class Content(db.Model):    #db.Model is a base class for models in sqlalchemy, Content inherits from db.Model
    id = db.Column(db.String, primary_key=True)
    title = db.Column(db.String(100))
    text = db.Column(db.Text)
    image = db.Column(db.String)
    # thumbnail = db.Column(db.String)

#function to change data object into json friendly format
    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "text": self.text,
            "image": self.image,
            # "thumbnail": self.thumbnail
        }

#create tables
with app.app_context():
    db.create_all()

@app.route('/')
def hello_world():
    response = jsonify({"name": "shikhar"})
    return response

@app.route('/api/admin/login', methods=['POST'])
def admin_login():
    data = request.json
    password = data.get('password')

    # Replace this with your secure check!
    if password == "admin123":
        return jsonify(success=True)
    
    return jsonify(success=False)

#upload new content
@app.route('/upload', methods=['POST'])
def upload_files():
    #getting files
    image = request.files['image']
    # thumbnail = request.files['thumbnail']
    Title = request.form['title']
    Text = request.form['text']

    image_upload = cloudinary.uploader.upload(image,transformation=[
        
            {"overlay": "jdjddhybnutmcfxexwpd"},  # Your watermark public ID
            {'flags': ["layer_apply", "tiled"]},                       # Apply tiling (repeat the watermark)
            {"opacity": 100},                         # Optional: adjust opacity
            {"width": 1.0},                          # Optional: scale the watermark (relative size)
            {"gravity": "center"}                    # Optional: center watermark position for tiling
        
    ])#returns a dictionary
    # thumb_upload = cloudinary.uploader.upload(thumbnail)

    imageUrl = image_upload['secure_url']
    # thumbUrl = thumb_upload['secure_url']
    imagePublicId = image_upload.get("public_id")

    new_content = Content(
        # id=str(uuid.uuid4()),#unique str id
        id=imagePublicId,
        title=Title,
        text=Text,
        image=imageUrl,#string that indicates path to the file
        # thumbnail=thumbUrl
    )
    db.session.add(new_content)#adding new_content to db
    db.session.commit()#saves it permanently
    return jsonify(new_content.to_dict()), 201

@app.route('/api/edit-content/<string:content_id>', methods=['PUT'])
def edit_content(content_id):
    data = request.get_json()

    content = db.session.get(Content, content_id)
    if not content:
        return jsonify({'error': 'Content not found'}), 404
    
    content.id = data.get('new_id', content.id)
    content.title = data.get('title', content.title)
    content.text = data.get('text', content.text)
    content.image = data.get('image', content.image)
    # content.thumbnail = data.get('thumbnail', content.thumbnail)

    db.session.commit()
    return jsonify({'message': 'Content updated successfully'})

@app.route('/api/upload-image', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image file provided'}), 400

    file = request.files['image']

    result = cloudinary.uploader.upload(file,transformation=[
        
            {"overlay": "jdjddhybnutmcfxexwpd"},  # Your watermark public ID
            {'flags': ["layer_apply", "tiled"]},                       # Apply tiling (repeat the watermark)
            {"opacity": 100},                         # Optional: adjust opacity
            {"width": 1.0},                          # Optional: scale the watermark (relative size)
            {"gravity": "center"}                    # Optional: center watermark position for tiling
        
    ])#returns a dictionary
    image_url = result['secure_url']
    image_id = result['public_id']
    
    return jsonify({
        'image_url': image_url,
        'id': image_id
        # 'thumbnail': image_url  # optional resizing
    })

@app.route('/api/get-content', methods=['GET'])
def get_content():
    content = Content.query.all()
    return jsonify([{
        'id': c.id,
        'title': c.title,
        'text': c.text,
        'image': c.image,
        # 'thumbnail': c.thumbnail
    } for c in content])

@app.route('/api/delete-content', methods=['POST'])
def delete_content():
    data = request.get_json()
    ids_to_delete = data['ids']

    for id in ids_to_delete:
        content = db.session.get(Content, id)
        if content:
            
            
            # Delete from database
            db.session.delete(content)
            db.session.commit()
    # Delete from Cloudinary
    cloudinary.api.delete_resources(ids_to_delete)

    return jsonify({"message": "Deleted successfully"}), 200

@app.route('/api/delete-image', methods = ['POST'])
def delete_image():
    data = request.get_json()
    id_to_delete = data['id']
    cloudinary.api.delete_resources([id_to_delete])
    return jsonify({"message": "Deleted successfully"}), 200




if __name__ == '__main__':
    app.run()
