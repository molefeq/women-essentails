using System;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Drawing.Imaging;
using System.IO;

namespace WomenEssentail.Common.Utilities
{
    public class ImageResizer
    {
        public ImageResizer() { }
        public ImageResizer(int newImageWidth, int newImageHeight)
        {
            NewImageHeight = newImageHeight;
            NewImageWidth = newImageWidth;
        }

        public ImageResizer(string oldImageFileName, string newImageFileName, int newImageWidth, int newImageHeight)
        {
            OldImageFileName = oldImageFileName;
            NewImageFileName = newImageFileName;
            NewImageHeight = newImageHeight;
            NewImageWidth = newImageWidth;
        }

        #region Public Properties

        public string OldImageFileName { get; set; }
        public string NewImageFileName { get; set; }
        public int NewImageHeight { get; set; }
        public int NewImageWidth { get; set; }

        #endregion

        public Stream ResizeImage(Stream stream, string fileExtension)
        {
            //if (!File.Exists(OldImageFileName))
            //{
            //    throw new Exception("Image file you tring to resize does not exists");
            //}

            ImageFormat imageFormat = GetImageFormat(fileExtension);
            MemoryStream outputStream = new MemoryStream();

            try
            {
                using (stream)
                {
                    using (Bitmap oldImage = (Bitmap)Bitmap.FromStream(stream))
                    {
                        stream.Close();

                        ResizeToFixedSize(oldImage).Save(outputStream, imageFormat);
                    }
                }
            }
            catch (Exception ex)
            {
                throw;
            }

            return outputStream;
        }

        public void ResizeImage()
        {
            if (!File.Exists(OldImageFileName))
            {
                throw new Exception("Image file you tring to resize does not exists");
            }


            FileInfo fileInfo = new FileInfo(OldImageFileName);
            ImageFormat imageFormat = GetImageFormat(fileInfo.Extension.ToLower());
            
            try
            {
                using (FileStream fs = new FileStream(OldImageFileName, FileMode.Open))
                {
                    using (Bitmap oldImage = (Bitmap)Bitmap.FromStream(fs))
                    {
                        fs.Close();

                        ResizeToFixedSize(oldImage).Save(NewImageFileName, imageFormat);
                    }
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        // Getting the right format for the image.
        private ImageFormat GetImageFormat(string fileExtension)
        {
            switch (fileExtension.ToLower())
            {
                case ".png":
                    return ImageFormat.Png;
                case ".gif":
                    return ImageFormat.Gif;
                case ".ico":
                    return ImageFormat.Icon;
                case ".tif":
                    return ImageFormat.Tiff;
                case ".exit":
                    return ImageFormat.Exif;
                case ".bmp":
                    return ImageFormat.Bmp;
                default:
                    return ImageFormat.Jpeg;
            }
        }

        private Image ResizeToFixedSize(Image oldImage)
        {
            int sourceImageWidth = oldImage.Width;
            int sourceImageHeight = oldImage.Height;
            int xDestinationPosition;
            int yDestinationPosition;

            float aspectRatio = getAspectRatio(sourceImageWidth, sourceImageHeight, out xDestinationPosition, out yDestinationPosition);

            int destinationImageWidth = (int)(sourceImageWidth * aspectRatio);
            int destinationImageHeight = (int)(sourceImageHeight * aspectRatio);

            Bitmap newImage = new Bitmap(NewImageWidth, NewImageHeight, PixelFormat.Format24bppRgb);

            newImage.SetResolution(oldImage.HorizontalResolution, oldImage.VerticalResolution);

            using (Graphics graphics = Graphics.FromImage(newImage))
            {
                graphics.Clear(Color.White);
                graphics.InterpolationMode = InterpolationMode.HighQualityBicubic;
                graphics.DrawImage(oldImage,
                                   new Rectangle(xDestinationPosition, yDestinationPosition, destinationImageWidth, destinationImageHeight),
                                   new Rectangle(0, 0, sourceImageWidth, sourceImageHeight),
                                   GraphicsUnit.Pixel);
            }

            return newImage;
        }

        private float getAspectRatio(float sourceImageWidth, float sourceImageHeight, out int xDestinationPosition, out int yDestinationPosition)
        {
            float sourceRatio = ((float)sourceImageWidth / (float)sourceImageHeight);
            float destinationRatio = ((float)NewImageWidth / (float)NewImageHeight);
            float ratio = 0;

            xDestinationPosition = 0;
            yDestinationPosition = 0;

            if (destinationRatio > sourceRatio)
            {
                ratio = NewImageHeight / sourceImageHeight;
                xDestinationPosition = Convert.ToInt16((NewImageWidth - (sourceImageWidth * ratio)) / 2);
            }
            else
            {
                ratio = NewImageWidth / sourceImageWidth;
                yDestinationPosition = Convert.ToInt16((NewImageHeight - (sourceImageHeight * ratio)) / 2);
            }

            return ratio;
        }
    }
}
