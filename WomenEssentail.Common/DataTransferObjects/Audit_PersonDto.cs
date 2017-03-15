using Libraries.Common.Enums;

using System;

namespace WomenEssentail.Common.DataTransferObjects
{
	public class Audit_PersonDto 
	{
		public int Id { get; set; }
		public int PersonId { get; set; }
		public string Title { get; set; }
		public string FirstName { get; set; }
		public string Initials { get; set; }
		public string LastName { get; set; }
		public DateTime DateOfBirth { get; set; }
		public bool IsSouthAfricanCitizen { get; set; }
		public string IdOrPassportNumber { get; set; }
		public string EthnicGroup { get; set; }
		public string Gender { get; set; }
		public string MaritalStatus { get; set; }
		public string HomeLanguage { get; set; }
		public string Logo { get; set; }
		public int PhysicalAddressId { get; set; }
		public int PostalAddressId { get; set; }
		public string EmailAddress { get; set; }
		public string WorkTelephoneCode { get; set; }
		public string WorkTelephoneNumber { get; set; }
		public string HomeTelephoneCode { get; set; }
		public string HomeTelephoneNumber { get; set; }
		public string MobileNumber { get; set; }
		public int StatusId { get; set; }
		public int EditUserId { get; set; }
		public int CreateUserId { get; set; }
		public DateTime EditDate { get; set; }
		public DateTime CreatDate { get; set; }
		public CrudStatus CrudStatus { get; set; }
	}
}

