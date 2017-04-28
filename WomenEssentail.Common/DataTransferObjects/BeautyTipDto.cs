using Libraries.Common.Enums;

using System;

namespace WomenEssentail.Common.DataTransferObjects
{
	public class BeautyTipDto 
	{
		public int? Id { get; set; }
		public string Subject { get; set; }
		public int? CategoryId { get; set; }
        public string CategoryName { get; set; }
        public int? SubCategoryId { get; set; }
        public string SubCategoryName { get; set; }
        public string Tip { get; set; }
		public int StatusId { get; set; }
        public string StatusName { get; set; }
        public string StatusCode { get; set; }
        public DateTime CreateDate { get; set; }
		public int? CreateUserId { get; set; }
		public DateTime EditDate { get; set; }
		public int? EditUserId { get; set; }
		public CrudStatus CrudStatus { get; set; }
	}
}

