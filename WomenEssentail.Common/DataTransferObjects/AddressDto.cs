using Libraries.Common.Enums;

using System;

namespace WomenEssentail.Common.DataTransferObjects
{
	public class AddressDto 
	{
		public int Id { get; set; }
		public string Line1 { get; set; }
		public string Line2 { get; set; }
		public string Surbub { get; set; }
		public string City { get; set; }
		public string PostalCode { get; set; }
		public string Latitude { get; set; }
		public string Longitude { get; set; }
		public int ProvinceId { get; set; }
		public int CountryId { get; set; }
		public int EditUserId { get; set; }
		public int CreateUserId { get; set; }
		public DateTime EditDate { get; set; }
		public DateTime CreatDate { get; set; }
		public int StatusId { get; set; }
		public CrudStatus CrudStatus { get; set; }
	}
}

