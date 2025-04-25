
import MasterScreen from "@/components/masters/MasterScreen";

const RoleMaster = () => {
  const columns = [
    { key: "name", label: "Role Name" },
    { key: "description", label: "Role Description" },
  ];

  const mockData = [
    { name: "EMPLOYEE", description: "Employee" },
    { name: "USER", description: "Specific access" },
    { name: "ADMINISTRATOR", description: "Regular Admin role with permissions" },
    { name: "DELEGATED_ADMIN", description: "User acting as a delegated admin" },
    { name: "SUPER_ADMINISTRATOR", description: "Super Administrator role with all permissions" },
  ];

  return (
    <MasterScreen
      title="Role Master"
      description="role master data"
      columns={columns}
      data={mockData}
    />
  );
};

export default RoleMaster;
