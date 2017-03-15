using Libraries.Common.Enums;

using System;

namespace WomenEssentail.Common.DataTransferObjects
{
	public class CompanyTypeProductDto 
	{
		public int Id { get; set; }
		public int ProductId { get; set; }
		public int CompanyTypeId { get; set; }
		public int StatusId { get; set; }
		public DateTime CreateDate { get; set; }
		public int CreateUserId { get; set; }
		public DateTime EditDate { get; set; }
		public int EditUserId { get; set; }
		public CrudStatus CrudStatus { get; set; }
	}
}

