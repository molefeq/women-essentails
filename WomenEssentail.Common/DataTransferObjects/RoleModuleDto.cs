using Libraries.Common.Enums;

using System;

namespace WomenEssentail.Common.DataTransferObjects
{
    public class RoleModuleDto
    {
        public int? Id { get; set; }
        public int ModuleId { get; set; }
        public string ModuleName { get; set; }
        public int RoleId { get; set; }
        public string RoleName { get; set; }
        public int StatusId { get; set; }
        public DateTime CreateDate { get; set; }
        public int CreateUserId { get; set; }
        public DateTime EditDate { get; set; }
        public int EditUserId { get; set; }
        public CrudStatus CrudStatus { get; set; }
    }
}

