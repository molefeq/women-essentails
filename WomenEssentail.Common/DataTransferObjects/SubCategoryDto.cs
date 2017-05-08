using Libraries.Common.Enums;

using System;

namespace WomenEssentail.Common.DataTransferObjects
{
    public class SubCategoryDto
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string DisplayName { get; set; }
        public int StatusId { get; set; }
        public DateTime CreateDate { get; set; }
        public int CreateUserId { get; set; }
        public DateTime EditDate { get; set; }
        public int EditUserId { get; set; }
        public string StatusName { get; set; }
        public string StatusCode { get; set; }
        public CrudStatus CrudStatus { get; set; }
    }
}
