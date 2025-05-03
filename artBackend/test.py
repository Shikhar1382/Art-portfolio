import cloudinary
import cloudinary.uploader
import cloudinary.api

cloudinary.config(
    cloud_name= "dko8vw6dr",
    api_key = "147894539887853",
    api_secret= "PJDisH3ZFkvul-nGqdQOllEavms",
    secure = True
)

image = cloudinary.uploader.upload("uploads/img.png")
print(image)