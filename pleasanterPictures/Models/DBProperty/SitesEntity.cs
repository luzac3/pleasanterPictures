using Microsoft.EntityFrameworkCore;

namespace pleasanterPictures.Models.DBProperty
{
    [PrimaryKey(nameof(SiteId))]
    public class SitesEntity
    {
        public int? TenantId { get; set; }
        public long? SiteId { get; set; }
        public DateTime? UpdatedTime { get; set; }
        public int? Ver { get; set; }
        public string? Title { get; set; }
        public string? Body { get; set; }
        public string? SiteName { get; set; }
        public string? SiteGroupName { get; set; }
        public string? GridGuide { get; set; }
        public string? EditorGuide { get; set; }
        public string? CalendarGuide { get; set; }
        public string? CrosstabGuide { get; set; }
        public string? GanttGuide { get; set; }
        public string? BurnDownGuide { get; set; }
        public string? TimeSeriesGuide { get; set; }
        public string? AnalyGuide { get; set; }
        public string? KambanGuide { get; set; }
        public string? ImageLibGuide { get; set; }
        public string? ReferenceType { get; set; }
        public long? ParentId { get; set; }
        public long? InheritPermission { get; set; }
        public string? SiteSettings { get; set; }
        public bool? Publish { get; set; }
        public bool? DisableCrossSearch { get; set; }
        public DateTime? LockedTime { get; set; }
        public int? LockedUser { get; set; }
        public DateTime? ApiCountDate { get; set; }
        public int? ApiCount { get; set; }
        public string? Comments { get; set; }
        public int? Creator { get; set; }
    }
}
