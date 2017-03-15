using Libraries.Common.Enums;

using System;

namespace WomenEssentail.Common.DataTransferObjects
{
	public class Audit_RoleModuleDto 
	{
		public int Id { get; set; }
		public int RoleModuleId { get; set; }
		public int ModuleId { get; set; }
		public int RoleId { get; set; }
		public int StatusId { get; set; }
		public DateTime CreateDate { get; set; }
		public int CreateUserId { get; set; }
		public DateTime EditDate { get; set; }
		public int EditUserId { get; set; }
		public CrudStatus CrudStatus { get; set; }
	}
}
