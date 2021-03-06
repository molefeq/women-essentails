using Libraries.Common.Enums;

using System;

namespace WomenEssentail.Common.DataTransferObjects
{
	public class OrganisationDto 
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Code { get; set; }
		public string Description { get; set; }
		public int ContactPersonId { get; set; }
		public int PhysicalAddressId { get; set; }
		public int PostalAddressId { get; set; }
		public string Logo { get; set; }
		public int StatusId { get; set; }
		public int EditUserId { get; set; }
		public int CreateUserId { get; set; }
		public DateTime EditDate { get; set; }
		public DateTime CreatDate { get; set; }
		public CrudStatus CrudStatus { get; set; }
	}
}

