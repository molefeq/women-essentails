using Libraries.Common.Extensions;

using System.Data.SqlClient;

using WomenEssentail.Common.DataTransferObjects;

namespace WomenEssentail.ServiceBusinessRules.EntityManagers.BeautyTips.Mappers
{
    public class BeautyTipMappers 
	{
		private static BeautyTipMappers _Instance;

		private BeautyTipMappers()
		{ 
		} 

		public static BeautyTipMappers Instance
		{
			get
			{
				if (_Instance == null)
				{
					_Instance = new BeautyTipMappers();
				}
				return _Instance;
			}
		}

        public BeautyTipDto MapFromGetBeautyTips(SqlDataReader sqlDataReader)
        {
            BeautyTipDto beautyTipDto = new BeautyTipDto();

            beautyTipDto.Id = sqlDataReader["Id"].ToInteger();
            beautyTipDto.CategoryId = sqlDataReader["CategoryId"].ToInteger();
            beautyTipDto.CategoryName = sqlDataReader["CategoryName"].ToString();
            beautyTipDto.Subject = sqlDataReader["Subject"].ToString();
            beautyTipDto.SubCategoryId = sqlDataReader["SubCategoryId"].ToInteger();
            beautyTipDto.SubCategoryName = sqlDataReader["SubCategoryName"].ToString();
            beautyTipDto.Tip = sqlDataReader["Tip"].ToString();
            beautyTipDto.StatusId = sqlDataReader["StatusId"].ToInteger();
            beautyTipDto.StatusCode = sqlDataReader["StatusCode"].ToString();
            beautyTipDto.StatusName = sqlDataReader["StatusName"].ToString();
            beautyTipDto.CreateDate = sqlDataReader["CreateDate"].ToDateTime();
            beautyTipDto.CreateUserId = sqlDataReader["CreateUserId"].ToInteger();
            beautyTipDto.EditDate = sqlDataReader["EditDate"].ToDateTime();
            beautyTipDto.EditUserId = sqlDataReader["EditUserId"].ToInteger();

            return beautyTipDto;
        }

        public BeautyTipDto MapToBeautyTipDto(SqlDataReader sqlDataReader)
		{
			BeautyTipDto beautyTipDto = new BeautyTipDto();

			beautyTipDto.Id = sqlDataReader["Id"].ToInteger();
			beautyTipDto.CategoryId = sqlDataReader["CategoryId"].ToInteger();
            beautyTipDto.Subject = sqlDataReader["Subject"].ToString();
            beautyTipDto.SubCategoryId = sqlDataReader["SubCategoryId"].ToInteger();
            beautyTipDto.Tip = sqlDataReader["Tip"].ToString();
            beautyTipDto.StatusId = sqlDataReader["StatusId"].ToInteger();
			beautyTipDto.CreateDate = sqlDataReader["CreateDate"].ToDateTime();
			beautyTipDto.CreateUserId = sqlDataReader["CreateUserId"].ToInteger();
			beautyTipDto.EditDate = sqlDataReader["EditDate"].ToDateTime();
			beautyTipDto.EditUserId = sqlDataReader["EditUserId"].ToInteger();

			return beautyTipDto;
		}

	}
}

