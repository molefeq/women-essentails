using Libraries.Common.Enums;

using System;

namespace WomenEssentail.Common.DataTransferObjects
{
	public class CountryDto 
	{
		public int Id { get; set; }
		public string Code { get; set; }
		public string Name { get; set; }
		public CrudStatus CrudStatus { get; set; }
	}
}

