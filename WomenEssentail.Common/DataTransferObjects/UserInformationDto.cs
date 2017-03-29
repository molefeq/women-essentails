using System;
using System.Collections.Generic;

namespace WomenEssentail.Common.DataTransferObjects
{
    public class UserInformationDto
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string UserName { get; set; }
        public string EmailAddress { get; set; }
        public bool IsFirstTimeLoggedInd { get; set; }
        public int? OrganisationId { get; set; }
        public string OrganisationName { get; set; }
        public int? CompanyId { get; set; }
        public string CompanyName { get; set; }
        public DateTime CreateDate { get; set; }

        public List<RoleModuleDto> AccessModules { get; set; }

        public UserInformationDto()
        {
            AccessModules = new List<RoleModuleDto>();
        }
    }
}
