using Libraries.Common.Enums;

using System;

namespace WomenEssentail.Common.DataTransferObjects
{
    public class AppRatingDto 
	{
		public int Id { get; set; }
		public int DeviceId { get; set; }
		public int Rating { get; set; }
		public DateTime CreateDate { get; set; }
		public CrudStatus CrudStatus { get; set; }
	}
}

