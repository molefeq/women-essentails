using Libraries.Common.Enums;

using System;

namespace WomenEssentail.Common.DataTransferObjects
{
	public class ModuleDto 
	{
		public int Id { get; set; }
		public string Code { get; set; }
		public string Name { get; set; }
		public string ModuleUrl { get; set; }
		public int ParentModuleId { get; set; }
		public int StatusId { get; set; }
		public DateTime CreateDate { get; set; }
		public int CreateUserId { get; set; }
		public DateTime EditDate { get; set; }
		public int EditUserId { get; set; }
		public CrudStatus CrudStatus { get; set; }
	}
}

