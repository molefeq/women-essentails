using Libraries.Common.Enums;

using System;

namespace WomenEssentail.Common.DataTransferObjects
{
	public class Audit_AccountDto 
	{
		public int Id { get; set; }
		public int AccountId { get; set; }
		public string UserName { get; set; }
		public string PasswordHash { get; set; }
		public int AccountUserId { get; set; }
		public bool IsFirstTimeLoggedInd { get; set; }
		public int OrganisationId { get; set; }
		public int CompanyId { get; set; }
		public int StatusId { get; set; }
		public DateTime LastLoginDate { get; set; }
		public DateTime CreateDate { get; set; }
		public int CreateUserId { get; set; }
		public DateTime EditDate { get; set; }
		public int EditUserId { get; set; }
		public int ExternalAuthenticationTypeId { get; set; }
		public string ExternalAuthenticationKey { get; set; }
		public Guid ForgotPasswordKey { get; set; }
		public CrudStatus CrudStatus { get; set; }
	}
}

