using Libraries.Common.Enums;

using System;

namespace WomenEssentail.Common.DataTransferObjects
{
    public class CompanyRequestDto
    {
        public int? Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmailAddress { get; set; }
        public string ContactNumber { get; set; }
        public string PhysicalAddress { get; set; }
        public DateTime CreateDate { get; set; }
        public int StatusId { get; set; }
        public string StatusName { get; set; }
        public string StatusCode { get; set; }
        public DateTime EditDate { get; set; }
        public CrudStatus CrudStatus { get; set; }
    }
}
