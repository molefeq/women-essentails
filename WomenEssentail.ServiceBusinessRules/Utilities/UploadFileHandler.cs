using System;
using System.IO;
using System.Web;

using WomenEssentail.Common.DataHelper;
using WomenEssentail.Common.Utilities;

namespace WomenEssentail.ServiceBusinessRules.Utilities
{
    public static class UploadFileHandler
    {
        public static string SaveUploadedImage(HttpPostedFile postedImage, ImageInformation imageInformation)
        {
            if (postedImage == null)
            {
                return null;
            }

            string fileName = Guid.NewGuid().ToString() + Path.GetExtension(postedImage.FileName);

            imageInformation.PhysicalFileName = GetPhysicalFileName(imageInformation.PhysicalDirectory, fileName);
            imageInformation.RelativeFileName = GetRelativeFileName(imageInformation.RelativeDirectory, fileName);

            postedImage.SaveAs(imageInformation.PhysicalFileName);
            ResizeImage(imageInformation);

            return fileName;
        }

        public static void ResizeImage(ImageInformation imageInformation)
        {
            ImageResizer imageResizer = new ImageResizer(imageInformation.PhysicalFileName, imageInformation.PhysicalFileName, imageInformation.Width, imageInformation.Height);
            imageResizer.ResizeImage();
        }

        public static void ResizeImage(string imageFileName, string fileName, ImageInformation imageInformation)
        {
            imageInformation.PhysicalFileName = GetPhysicalFileName(imageInformation.PhysicalDirectory, fileName);
            ImageResizer imageResizer = new ImageResizer(imageFileName, imageInformation.PhysicalFileName, imageInformation.Width, imageInformation.Height);
            imageResizer.ResizeImage();
        }

        public static string GetPhysicalFileName(string directory, string fileName, string fileSuffix = "")
        {
            if (string.IsNullOrEmpty(fileSuffix))
            {
                return Path.Combine(directory, fileName);
            }

            return Path.Combine(directory, Path.GetFileNameWithoutExtension(fileName) + "_" + fileSuffix + Path.GetExtension(fileName));
        }

        public static string GetRelativeFileName(string virtualDirectory, string fileName, string fileSuffix = "")
        {
            if (string.IsNullOrEmpty(fileSuffix))
            {
                return Path.Combine(virtualDirectory, fileName);
            }

            return Path.Combine(virtualDirectory, Path.GetFileNameWithoutExtension(fileName) + "_" + fileSuffix + Path.GetExtension(fileName));
        }
    }
}
