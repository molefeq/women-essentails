using Libraries.Common.Extensions;

using WomenEssentail.Common.DataTransferObjects;

using System.Data.SqlClient;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.CompanyFeedbacks.Mappers
{
	public class CompanyFeedbackMappers 
	{
		private static CompanyFeedbackMappers _Instance;

		private CompanyFeedbackMappers()
		{ 
		} 

		public static CompanyFeedbackMappers Instance
		{
			get
			{
				if (_Instance == null)
				{
					_Instance = new CompanyFeedbackMappers();
				}
				return _Instance;
			}
		}

		public CompanyFeedbackDto MapToCompanyFeedbackDto(SqlDataReader sqlDataReader)
		{
			CompanyFeedbackDto companyFeedbackDto = new CompanyFeedbackDto();

			companyFeedbackDto.Id = sqlDataReader["Id"].ToInteger();
			companyFeedbackDto.CompanyId = sqlDataReader["CompanyId"].ToInteger();
            companyFeedbackDto.Feedback = sqlDataReader["Feedback"].ToString();
            companyFeedbackDto.CreateDate = sqlDataReader["CreateDate"].ToDateTime();

			return companyFeedbackDto;
		}

	}
}

