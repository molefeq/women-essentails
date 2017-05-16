using Libraries.Common.Enums;

using System;

namespace WomenEssentail.Common.DataTransferObjects
{
	public class DeviceDetailsDto 
	{
		public int Id { get; set; }
		public string DeviceId { get; set; }
		public string DeviceName { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string MobileNumber { get; set; }
        public string DevicePlatform { get; set; }
		public string DeviceSerialNumber { get; set; }
		public DateTime CreateDate { get; set; }
		public CrudStatus CrudStatus { get; set; }
	}
}

