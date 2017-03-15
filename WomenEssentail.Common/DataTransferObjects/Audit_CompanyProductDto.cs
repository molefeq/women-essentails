using Libraries.Common.Enums;

using System;

namespace WomenEssentail.Common.DataTransferObjects
{
	public class Audit_CompanyProductDto 
	{
		public int Id { get; set; }
		public int CompanyProductId { get; set; }
		public int ProductId { get; set; }
		public int CompanyId { get; set; }
		public int StatusId { get; set; }
		public DateTime CreateDate { get; set; }
		public int CreateUserId { get; set; }
		public DateTime EditDate { get; set; }
		public int EditUserId { get; set; }
		public CrudStatus CrudStatus { get; set; }
	}
}

