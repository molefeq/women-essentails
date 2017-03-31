using Libraries.Common.Enums;
using Libraries.Common.Extensions;

using System.Data.SqlClient;

using WomenEssentail.Common.DataTransferObjects;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.CompanyRequest.Mappers
{
    public class CompanyRequestMapper
    {
        private static CompanyRequestMapper _instance;

        private CompanyRequestMapper()
        {
        }

        public static CompanyRequestMapper Instance
        {
            get
            {
                if (_instance == null)
                {
                    _instance = new CompanyRequestMapper();
                }

                return _instance;
            }
        }

        public CompanyRequestDto MapToCompanyRequestDto(SqlDataReader sqlDataReader)
        {
            CompanyRequestDto companyRequestDto = new CompanyRequestDto();

            companyRequestDto.Id = sqlDataReader["Id"].ToNullableInteger();
            companyRequestDto.FirstName = sqlDataReader["FirstName"].ToString();
            companyRequestDto.LastName = sqlDataReader["LastName"].ToString();
            companyRequestDto.EmailAddress = sqlDataReader["EmailAddress"].ToString();
            companyRequestDto.ContactNumber = sqlDataReader["ContactNumber"].ToString();
            companyRequestDto.PhysicalAddress = sqlDataReader["PhysicalAddress"].ToString();
            companyRequestDto.StatusId = sqlDataReader["StatusId"].ToInteger();
            companyRequestDto.StatusName = sqlDataReader["StatusName"].ToString();
            companyRequestDto.StatusCode = sqlDataReader["StatusCode"].ToString();
            companyRequestDto.CreateDate = sqlDataReader["CreateDate"].ToDateTime();
            companyRequestDto.EditDate = sqlDataReader["EditDate"].ToDateTime();
            companyRequestDto.CrudStatus = CrudStatus.UPDATE;

            return companyRequestDto;
        }
    }
}
