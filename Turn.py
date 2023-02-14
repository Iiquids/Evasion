import os
import cv2

folder_path = "Maps"

pixelWhite = [255 , 255, 255]
pixelBlack = [0, 0, 0]
pixelYellow = [0, 221, 255]

for filename in os.listdir(folder_path):
    if filename.endswith(".jpg") or filename.endswith(".png"):
        image_path = os.path.join(folder_path, filename)
        image = cv2.imread(image_path)

        height, width, _ = image.shape
        mapTable = []

        for row in range(height):
            mapCol = []
            for col in range(width):
                pixel = image[row, col]
                if pixel.tolist() == pixelBlack:
                    mapCol.append(1)
                elif pixel.tolist() == pixelYellow:
                    mapCol.append(2)
                else:
                    mapCol.append(0)
            mapTable.append(mapCol)
                
        with open(f"{filename}.txt", "w") as file:
            file.write(str(mapTable))