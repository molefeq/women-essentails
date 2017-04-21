using Libraries.Common.Enums;

using System;
using System.Collections.Generic;

namespace WomenEssentail.Common.DataTransferObjects
{
    public class CompanyDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public string Description { get; set; }
        public int OrganisationId { get; set; }
        public int CompanyTypeId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int? PhysicalAddressId { get; set; }
        public string PhysicalAddressLine1 { get; set; }
        public string PhysicalAddressLine2 { get; set; }
        public string PhysicalAddressSuburb { get; set; }
        public string PhysicalAddressCity { get; set; }
        public string PhysicalAddressPostalCode { get; set; }
        public string PhysicalAddressLatitude { get; set; }
        public string PhysicalAddressLongitude { get; set; }
        public int PhysicalAddressProvinceId { get; set; }
        public int PhysicalAddressCountryId { get; set; }
        public int? PostalAddressId { get; set; }
        public string PostalAddressLine1 { get; set; }
        public string PostalAddressLine2 { get; set; }
        public string PostalAddressSuburb { get; set; }
        public string PostalAddressCity { get; set; }
        public string PostalAddressPostalCode { get; set; }
        public string PostalAddressLatitude { get; set; }
        public string PostalAddressLongitude { get; set; }
        public int PostalAddressProvinceId { get; set; }
        public int PostalAddressCountryId { get; set; }
        public string EmailAddress { get; set; }
        public string BusinessContactCode { get; set; }
        public string BusinessContactNumber { get; set; }
        public string MobileNumber { get; set; }
        public string PreviewRelativeFileName { get; set; }
        public string NormalRelativeFileName { get; set; }
        public string ThumbnailRelativeFileName { get; set; }
        public List<CompanyLogoDto> Logos { get; set; }
        public int StatusId { get; set; }
        public int? EditUserId { get; set; }
        public int CreateUserId { get; set; }
        public DateTime EditDate { get; set; }
        public DateTime CreateDate { get; set; }
        public CrudStatus CrudStatus { get; set; }

        public CompanyDto()
        {
            Logos = new List<CompanyLogoDto>();
        }
    }
}

