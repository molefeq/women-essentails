using Libraries.AzureLibrary.StorageManager;
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
            ImageResizer imageResizer = new ImageResizer(imageInformation.Width, imageInformation.Height);

            using (var memoryStream = imageResizer.ResizeImage(postedImage.InputStream, Path.GetExtension(postedImage.FileName)))
            {
                //go back to start
                memoryStream.Seek(0, SeekOrigin.Begin);

                FileStorageManager.Instance.WriteToPublicContainer(
                    AppSettingsUtils.GetStringAppSetting("StorageConnectionString"),
                    AppSettingsUtils.GetStringAppSetting("StoragePublicContainerName"),
                    GetPhysicalFileName(imageInformation.BlobDirectoryName, fileName),
                    memoryStream);

                imageInformation.RelativeFileName = GetBlobRelativeFileName(AppSettingsUtils.GetStringAppSetting("StoragePrefixUrl"), imageInformation.BlobDirectoryName, fileName);
            }

            imageInformation.RelativeFileName = GetBlobRelativeFileName(AppSettingsUtils.GetStringAppSetting("StoragePrefixUrl"), imageInformation.BlobDirectoryName, fileName);

            return fileName;
        }

        public static void ResizeFromStreamImage(string imageBlobFileName, string fileName, ImageInformation imageInformation)
        {
            using (var outputStream = FileStorageManager.Instance.ReadToPublicContainer(AppSettingsUtils.GetStringAppSetting("StorageConnectionString"), AppSettingsUtils.GetStringAppSetting("StoragePublicContainerName"), imageBlobFileName))
            {
                ImageResizer imageResizer = new ImageResizer(imageInformation.Width, imageInformation.Height);
                outputStream.Seek(0, SeekOrigin.Begin);

                using (var memoryStream = imageResizer.ResizeImage(outputStream, Path.GetExtension(fileName)))
                {
                    //go back to start
                    memoryStream.Seek(0, SeekOrigin.Begin);

                    FileStorageManager.Instance.WriteToPublicContainer(
                        AppSettingsUtils.GetStringAppSetting("StorageConnectionString"),
                        AppSettingsUtils.GetStringAppSetting("StoragePublicContainerName"),
                        GetPhysicalFileName(imageInformation.BlobDirectoryName, fileName),
                        memoryStream);

                    imageInformation.RelativeFileName = GetBlobRelativeFileName(AppSettingsUtils.GetStringAppSetting("StoragePrefixUrl"), imageInformation.BlobDirectoryName, fileName);
                }
            }
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

        public static string GetBlobRelativeFileName(string blobStorageUrl, string blobDirectoryName, string fileName)
        {
            return Path.Combine(blobStorageUrl, blobDirectoryName, fileName);
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
