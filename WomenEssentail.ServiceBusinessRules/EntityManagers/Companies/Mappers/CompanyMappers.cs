using Libraries.Common.Extensions;

using WomenEssentail.Common.DataTransferObjects;

using System.Data.SqlClient;
using Libraries.Common.Enums;
using WomenEssentail.Common.DataHelper;
using WomenEssentail.ServiceBusinessRules.EntityManagers.CompanyTypes.Mappers;
using WomenEssentail.ServiceBusinessRules.EntityManagers.Categories.Mappers;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.Companies.Mappers
{
    public class CompanyMappers
    {
        private static CompanyMappers _Instance;

        private CompanyMappers()
        {
        }

        public static CompanyMappers Instance
        {
            get
            {
                if (_Instance == null)
                {
                    _Instance = new CompanyMappers();
                }
                return _Instance;
            }
        }
        
        public CompanyDataObject MapToCompanyDataObject(SqlDataReader sqlDataReader)
        {
            CompanyDataObject companyDataObject = new CompanyDataObject();

            using (sqlDataReader)
            {
                if (sqlDataReader.Read())
                {
                    companyDataObject.CompanyType = CompanyTypeMappers.Instance.MapToCompanyTypeDto(sqlDataReader);
                }

                sqlDataReader.NextResult();
                
                while (sqlDataReader.Read())
                {
                    companyDataObject.Categories.Add(CategoryMappers.Instance.MapToCategoryDto(sqlDataReader));
                }
            }

            return companyDataObject;
        }

        public CompanySummaryDto MapToLocationQueryCompanySummaryDto(SqlDataReader sqlDataReader)
        {
            CompanySummaryDto companyDto = new CompanySummaryDto();

            companyDto.Id = sqlDataReader["Id"].ToInteger();
            companyDto.Name = sqlDataReader["Name"].ToString();
            companyDto.MobileNumber = sqlDataReader["MobileNumber"].ToString();
            companyDto.Logo = sqlDataReader["Logo"].ToString();
            companyDto.Description = sqlDataReader["Description"].ToString();
            companyDto.EmailAddress = sqlDataReader["EmailAddress"].ToString();
            companyDto.PhysicalAddressLine1 = sqlDataReader["PhysicalAddressLine1"].ToString();
            companyDto.PhysicalAddressLine2 = sqlDataReader["PhysicalAddressLine2"].ToString();
            companyDto.PhysicalAddressSuburb = sqlDataReader["PhysicalAddressSuburb"].ToString();
            companyDto.PhysicalAddressCity = sqlDataReader["PhysicalAddressCity"].ToString();
            companyDto.PhysicalAddressPostalCode = sqlDataReader["PhysicalAddressPostalCode"].ToString();
            companyDto.PhysicalAddressLatitude = sqlDataReader["PhysicalAddressLatitude"].ToString();
            companyDto.PhysicalAddressLongitude = sqlDataReader["PhysicalAddressLongitude"].ToString();
            companyDto.Distance = sqlDataReader["Distance"].ToInteger();
            companyDto.CrudStatus = CrudStatus.UPDATE;

            return companyDto;
        }

        public CompanySummaryDto MapToCompanySummaryDto(SqlDataReader sqlDataReader)
        {
            CompanySummaryDto companyDto = new CompanySummaryDto();

            companyDto.Id = sqlDataReader["Id"].ToInteger();
            companyDto.Code = sqlDataReader["Code"].ToString();
            companyDto.Name = sqlDataReader["Name"].ToString();
            companyDto.MobileNumber = sqlDataReader["MobileNumber"].ToString();
            companyDto.Logo = sqlDataReader["Logo"].ToString();
            companyDto.Description = sqlDataReader["Description"].ToString();
            companyDto.OrganisationId = sqlDataReader["OrganisationId"].ToInteger();
            companyDto.OrganisationId = sqlDataReader["OrganisationId"].ToInteger();
            companyDto.CompanyTypeId = sqlDataReader["CompanyTypeId"].ToInteger();
            companyDto.StatusId = sqlDataReader["StatusId"].ToInteger();
            companyDto.EditUserId = sqlDataReader["EditUserId"].ToInteger();
            companyDto.CreateUserId = sqlDataReader["CreateUserId"].ToInteger();
            companyDto.EditDate = sqlDataReader["EditDate"].ToDateTime();
            companyDto.CreateDate = sqlDataReader["CreateDate"].ToDateTime();
            companyDto.EmailAddress = sqlDataReader["EmailAddress"].ToString();
            companyDto.StatusName = sqlDataReader["StatusName"].ToString();
            companyDto.StatusCode = sqlDataReader["StatusCode"].ToString();
            companyDto.TotalProducts = sqlDataReader["TotalProducts"].ToInteger();
            companyDto.TotalUsers = sqlDataReader["TotalUsers"].ToInteger();
            companyDto.PhysicalAddressLine1 = sqlDataReader["PhysicalAddressLine1"].ToString();
            companyDto.PhysicalAddressLine2 = sqlDataReader["PhysicalAddressLine2"].ToString();
            companyDto.PhysicalAddressSuburb = sqlDataReader["PhysicalAddressSuburb"].ToString();
            companyDto.PhysicalAddressCity = sqlDataReader["PhysicalAddressCity"].ToString();
            companyDto.PhysicalAddressPostalCode = sqlDataReader["PhysicalAddressPostalCode"].ToString();
            companyDto.PhysicalAddressLatitude = sqlDataReader["PhysicalAddressLatitude"].ToString();
            companyDto.PhysicalAddressLongitude = sqlDataReader["PhysicalAddressLongitude"].ToString();
            companyDto.CrudStatus = CrudStatus.UPDATE;

            return companyDto;
        }

        public CompanyDto MapToCompanyDto(SqlDataReader sqlDataReader)
        {
            CompanyDto companyDto = new CompanyDto();

            companyDto.Id = sqlDataReader["Id"].ToInteger();
            companyDto.Code = sqlDataReader["Code"].ToString();
            companyDto.Name = sqlDataReader["Name"].ToString();
            companyDto.MobileNumber = sqlDataReader["MobileNumber"].ToString();
            companyDto.Logo = sqlDataReader["Logo"].ToString();
            companyDto.Description = sqlDataReader["Description"].ToString();
            companyDto.OrganisationId = sqlDataReader["OrganisationId"].ToInteger();
            companyDto.OrganisationId = sqlDataReader["OrganisationId"].ToInteger();
            companyDto.CompanyTypeId = sqlDataReader["CompanyTypeId"].ToInteger();
            companyDto.StatusId = sqlDataReader["StatusId"].ToInteger();
            companyDto.EditUserId = sqlDataReader["EditUserId"].ToInteger();
            companyDto.CreateUserId = sqlDataReader["CreateUserId"].ToInteger();
            companyDto.EditDate = sqlDataReader["EditDate"].ToDateTime();
            companyDto.CreateDate = sqlDataReader["CreateDate"].ToDateTime();
            companyDto.PhysicalAddressLine1 = sqlDataReader["PhysicalAddressLine1"].ToString();
            companyDto.PhysicalAddressLine2 = sqlDataReader["PhysicalAddressLine2"].ToString();
            companyDto.PhysicalAddressSuburb = sqlDataReader["PhysicalAddressSuburb"].ToString();
            companyDto.PhysicalAddressCity = sqlDataReader["PhysicalAddressCity"].ToString();
            companyDto.PhysicalAddressPostalCode = sqlDataReader["PhysicalAddressPostalCode"].ToString();
            companyDto.PhysicalAddressLatitude = sqlDataReader["PhysicalAddressLatitude"].ToString();
            companyDto.PhysicalAddressLongitude = sqlDataReader["PhysicalAddressLongitude"].ToString();
            companyDto.PostalAddressLine1 = sqlDataReader["PostalAddressLine1"].ToString();
            companyDto.PostalAddressLine2 = sqlDataReader["PostalAddressLine2"].ToString();
            companyDto.PostalAddressSuburb = sqlDataReader["PostalAddressSuburb"].ToString();
            companyDto.PostalAddressCity = sqlDataReader["PostalAddressCity"].ToString();
            companyDto.PostalAddressPostalCode = sqlDataReader["PostalAddressPostalCode"].ToString();
            companyDto.PostalAddressLatitude = sqlDataReader["PostalAddressLatitude"].ToString();
            companyDto.PostalAddressLongitude = sqlDataReader["PostalAddressLongitude"].ToString();
            companyDto.FirstName = sqlDataReader["FirstName"].ToString();
            companyDto.LastName = sqlDataReader["LastName"].ToString();
            companyDto.EmailAddress = sqlDataReader["EmailAddress"].ToString();
            companyDto.CrudStatus = CrudStatus.UPDATE;

            return companyDto;
        }

    }
}

