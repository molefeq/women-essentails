using Libraries.Common.Enums;

using System;

namespace WomenEssentail.Common.DataTransferObjects
{
	public class ExternalAuthenticationTypeDto 
	{
		public int Id { get; set; }
		public string Code { get; set; }
		public string Name { get; set; }
		public string Logo { get; set; }
		public CrudStatus CrudStatus { get; set; }
	}
}

