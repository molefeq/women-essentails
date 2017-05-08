using Libraries.Common.Attributes;
using Libraries.Common.Enums;

using System;

namespace WomenEssentail.Common.DataTransferObjects
{
    public class CompanyLogoDto
    {
        [CustomSqlValueDataTypeAttribute(true, "Id", typeof(int))]
        public int Id { get; set; }

        [CustomSqlValueDataTypeAttribute(true, "CompanyId", typeof(int))]
        public int CompanyId { get; set; }

        [CustomSqlValueDataTypeAttribute(true, "ImageType", typeof(string))]
        public string ImageType { get; set; }

        [CustomSqlValueDataTypeAttribute(true, "Logo", typeof(string))]
        public string Logo { get; set; }

        [CustomSqlValueDataTypeAttribute(false)]
        public string PreviewRelativeFileName { get; set; }

        [CustomSqlValueDataTypeAttribute(false)]
        public string NormalRelativeFileName { get; set; }

        [CustomSqlValueDataTypeAttribute(false)]
        public string ThumbnailRelativeFileName { get; set; }

        [CustomSqlValueDataTypeAttribute(false)]
        public int StatusId { get; set; }

        [CustomSqlValueDataTypeAttribute(false)]
        public DateTime CreateDate { get; set; }

        [CustomSqlValueDataTypeAttribute(false)]
        public int? CreateUserId { get; set; }

        [CustomSqlValueDataTypeAttribute(false)]
        public DateTime EditDate { get; set; }

        [CustomSqlValueDataTypeAttribute(false)]
        public int? EditUserId { get; set; }

        [CustomSqlValueDataTypeAttribute(false)]
        public CrudStatus CrudStatus { get; set; }
    }
}
