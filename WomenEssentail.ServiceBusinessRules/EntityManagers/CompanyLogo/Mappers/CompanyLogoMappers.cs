using Libraries.Common.Enums;
using Libraries.Common.Extensions;

using System.Data.SqlClient;

using WomenEssentail.Common.DataTransferObjects;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.CompanyLogo.Mappers
{
    public class CompanyLogoMappers
    {

        private static CompanyLogoMappers _instance;

        private CompanyLogoMappers()
        {
        }

        public static CompanyLogoMappers Instance
        {
            get
            {
                if (_instance == null)
                {
                    _instance = new CompanyLogoMappers();
                }

                return _instance;
            }
        }
        public CompanyLogoDto MapToCompanyLogoDto(SqlDataReader sqlDataReader)
        {
            CompanyLogoDto companyLogoDto = new CompanyLogoDto();

            companyLogoDto.Id = sqlDataReader["Id"].ToInteger();
            companyLogoDto.Logo = sqlDataReader["Logo"].ToString();
            companyLogoDto.CrudStatus = CrudStatus.UPDATE;

            return companyLogoDto;
        }
    }
}
