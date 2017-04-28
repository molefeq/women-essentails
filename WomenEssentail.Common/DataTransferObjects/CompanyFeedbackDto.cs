using Libraries.Common.Enums;

using System;

namespace WomenEssentail.Common.DataTransferObjects
{
	public class CompanyFeedbackDto 
	{
		public int Id { get; set; }
		public int CompanyId { get; set; }
		public string Feedback { get; set; }
		public DateTime CreateDate { get; set; }
		public CrudStatus CrudStatus { get; set; }
	}
}

