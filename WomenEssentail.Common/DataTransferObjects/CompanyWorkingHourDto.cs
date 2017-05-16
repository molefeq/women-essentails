using Libraries.Common.Attributes;
using Libraries.Common.Enums;
using System;

namespace WomenEssentail.Common.DataTransferObjects
{
    public class CompanyWorkingHourDto
    {
        [CustomSqlValueDataTypeAttribute(true, "Id", typeof(int))]
        public int? Id { get; set; }

        [CustomSqlValueDataTypeAttribute(true, "CompanyId", typeof(int))]
        public int CompanyId { get; set; }

        [CustomSqlValueDataTypeAttribute(true, "DayName", typeof(string))]
        public string DayName { get; set; }

        [CustomSqlValueDataTypeAttribute(true, "StartTime", typeof(string))]
        public string StartTime { get; set; }

        [CustomSqlValueDataTypeAttribute(true, "EndTime", typeof(string))]
        public string EndTime { get; set; }

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
