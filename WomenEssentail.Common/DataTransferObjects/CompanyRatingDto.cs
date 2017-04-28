using Libraries.Common.Enums;

using System;

namespace WomenEssentail.Common.DataTransferObjects
{
	public class CompanyRatingDto 
	{
		public int Id { get; set; }
		public int CompanyId { get; set; }
		public int Rating { get; set; }
		public DateTime CreateDate { get; set; }
		public CrudStatus CrudStatus { get; set; }
	}
}

