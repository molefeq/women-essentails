using Libraries.Common.Enums;

using System;

namespace WomenEssentail.Common.DataTransferObjects
{
	public class ProductDto 
	{
		public int Id { get; set; }
        public int CompanyId { get; set; }
        public int CategoryId { get; set; }
        public int SubCategoryId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
		public string Title { get; set; }
		public string Logo { get; set; }
        public string RelativeFileName { get; set; }
        public int StatusId { get; set; }
		public DateTime CreateDate { get; set; }
		public int CreateUserId { get; set; }
		public DateTime EditDate { get; set; }
        public int EditUserId { get; set; }
        public decimal Price { get; set; }
		public CrudStatus CrudStatus { get; set; }
	}
}

