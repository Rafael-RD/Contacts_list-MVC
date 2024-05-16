namespace Contacts_list.Models
{
    public class ContactModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Company { get; set; } = String.Empty;
        public string BusinessPhone { get; set; } = String.Empty;
        public string PrivatePhone { get; set; } = String.Empty;
        public List<string> Email { get; set; } = new List<string>();
    }
}
