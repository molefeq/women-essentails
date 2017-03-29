using Libraries.Common.Enums;
using Libraries.Common.ResponseObjects;

using Libraries.DataAccess.AdoDotNetLibrary;
using Libraries.DataAccess.AdoDotNetLibrary.CommandTypeManagers;
using Libraries.DataAccess.AdoDotNetLibrary.Enums;
using Libraries.DataAccess.AdoDotNetLibrary.Extensions;
using Libraries.DataAccess.AdoDotNetLibrary.Models;

using WomenEssentail.Common.DataTransferObjects;

using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using WomenEssentail.Common.DataFilters;

namespace WomenEssentail.DataAccess.Repositories
{
	public class RoleRepository :  DataAccessEntitySet<RoleDto> 
	{
		public RoleRepository(SqlConnection connection) 
			: base(new StoredProcedureManager(connection)) 
		{
		}

        public Result<RoleDto> Get(SearchFilter searchFilter, Func<SqlDataReader, RoleDto> roleMapper)
        {
            List<SqlQueryParameter> sqlQueryParameters = GetPagedDataParameters(searchFilter.PageData);

            sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "SearchText ", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = searchFilter.SearchText });

            return GetPagedEntities("RolesFetch", roleMapper, sqlQueryParameters.ToArray());
        }

        public Response<RoleDto> Save(RoleDto roleDto, Func<SqlDataReader, RoleDto> roleDtoMapper) 
		{
			SqlQueryParameter[] sqlQueryParameters = GetSaveParameters(roleDto);
			string storedProcedureName = GetCrudStoredProcedureName(roleDto.CrudStatus);

			return Save(storedProcedureName, roleDtoMapper, sqlQueryParameters);
		}

		#region Private Methods

		private SqlQueryParameter[] GetSaveParameters(RoleDto roleDto)
		{
			List<SqlQueryParameter> sqlQueryParameters = new List<SqlQueryParameter>();

			if (roleDto.CrudStatus == CrudStatus.DELETE || roleDto.CrudStatus == CrudStatus.UPDATE || roleDto.CrudStatus == CrudStatus.READ)
			{
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "Id", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = roleDto.Id });
			}

			if (roleDto.CrudStatus == CrudStatus.CREATE || roleDto.CrudStatus == CrudStatus.UPDATE)
			{
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "Code", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 50, ParameterValue = roleDto.Code });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "Name", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.String, ParameterSize = 100, ParameterValue = roleDto.Name });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "CreateDate", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.DateTime, ParameterValue = roleDto.CreateDate });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "CreateUserId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = roleDto.CreateUserId });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "EditDate", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.DateTime, ParameterValue = roleDto.EditDate });
				sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "EditUserId", ParameterDirection = DbParameterDirection.Input, ParamentType = CodeParameterType.Integer, ParameterValue = roleDto.EditUserId });
			}

			sqlQueryParameters.Add(new SqlQueryParameter { ParameterName = "ValidationMessages", ParameterDirection = DbParameterDirection.Output, ParamentType = CodeParameterType.String, ParameterSize = 8000 });

			return sqlQueryParameters.ToArray();
		}


		private string GetCrudStoredProcedureName(CrudStatus crudStatus) 
		{
			switch (crudStatus)
			{
				case CrudStatus.CREATE:
					 return "AccountInsert";
				case CrudStatus.UPDATE:
					 return "AccountUpdate";
				case CrudStatus.DELETE:
					 return "AccountDelete";
				case CrudStatus.READ:
					 return "AccountFetch";
				default:
					 throw new Exception("Invalid crud operation.");
			}
		}

        public Result<RoleDto> Get(int? userId, string searchText, PageData pageData, object mapToRoleDto)
        {
            throw new NotImplementedException();
        }

        #endregion


    }
}

