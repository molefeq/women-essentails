using Libraries.Common.Enums;
using Libraries.Common.Extensions;
using System;
using System.Data.SqlClient;
using WomenEssentail.Common.DataTransferObjects;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.CompanyWorkingHours.Mappers
{
    public class CompanyWorkingHourMappers
    {

        private static CompanyWorkingHourMappers _instance;

        private CompanyWorkingHourMappers()
        {
        }

        public static CompanyWorkingHourMappers Instance
        {
            get
            {
                if (_instance == null)
                {
                    _instance = new CompanyWorkingHourMappers();
                }

                return _instance;
            }
        }

        public CompanyWorkingHourDto MapToCompanyWorkingHourDto(SqlDataReader sqlDataReader)
        {
            CompanyWorkingHourDto companyWorkingHourDto = new CompanyWorkingHourDto();

            companyWorkingHourDto.Id = sqlDataReader["Id"].ToInteger();
            companyWorkingHourDto.CompanyId = sqlDataReader["CompanyId"].ToInteger();
            companyWorkingHourDto.DayName = sqlDataReader["DayName"].ToString();
            companyWorkingHourDto.StartTime = sqlDataReader["StartTime"].ToString();
            companyWorkingHourDto.EndTime = sqlDataReader["EndTime"].ToString();
            companyWorkingHourDto.CrudStatus = CrudStatus.UPDATE;

            return companyWorkingHourDto;
        }
    }
}
