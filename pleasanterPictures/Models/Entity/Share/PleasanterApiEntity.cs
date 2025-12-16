using offlineMeeting.Models.Entity.Share;
using System.Collections;
using System.Collections.Generic;
using System.Text.Json;

namespace offlineMeeting.Models.Share
{
    public class PleasanterApiEntity: ApiEntity
    {
        public Dictionary<string, string> ClassHash { get; set; } = new();
        public Dictionary<string, decimal> NumHash { get; set; } = new();
        public Dictionary<string, DateTime> DateHash { get; set; } = new();
        public Dictionary<string, string> DescriptionHash { get; set; } = new();
        public Dictionary<string, bool> CheckHash { get; set; } = new();
        public Dictionary<string, string> AttachmentsHash { get; set; } = new();
    }
}
