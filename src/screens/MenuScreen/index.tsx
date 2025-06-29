import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface Masterfiles {
  items: Item[];
  departments: Department[];
}

interface Department {
  ID: number;
  Name: string;
  OrderNo: number;
}

interface Item {
  ID: number;
  ItemLookupCode: string;
  Description: string;
  ExtendedDescription: string;
  Price: number;
  Quantity: number;
  DepartmentID: number;
  CategoryID: number;
  SubCategoryID: number;
  OrderNo: number;
}

export default function MenuScreen() {
  const [masterfiles, setMasterfiles] = useState<Masterfiles>({
    items: [],
    departments: [],
  });

  const [selectedDepartment, setSelectedDepartment] = useState<Department>();
  const [selectedItemGroup, setSelectedItemGroup] = useState<Item[]>([]);

  const fetchMasterfiles = async () => {
    try {
      const res = await axios.get<Masterfiles>("/api/items");
      setMasterfiles(res.data);
    } catch (error) {
      console.error("Failed to fetch masterfiles:", error);
    }
  };

  useEffect(() => {
    fetchMasterfiles();
  }, []);

  useEffect(() => {
    if (selectedDepartment) {
      console.log("Selected department:", selectedDepartment);
      const filteredItems = masterfiles.items.filter(
        (item) => item.DepartmentID === selectedDepartment.ID
      );
      setSelectedItemGroup(filteredItems);
    }
  }, [selectedDepartment, masterfiles.items]);

  useEffect(() => {
    if (selectedItemGroup) {
      console.log("Selected item group:", selectedItemGroup);
    }
  }, [selectedItemGroup]);

  return (
    <div className="grid grid-cols-2 gap-4">
      {masterfiles.departments.map((department) => (
        <DepartmentGroup
          department={department}
          key={department.ID}
          onClick={() => setSelectedDepartment(department)}
        />
      ))}
    </div>
  );
}

interface DepartmentGroupProps {
  department: Department;
  onClick: () => void;
}
const DepartmentGroup: React.FC<DepartmentGroupProps> = ({
  department,
  onClick,
}) => {
  return (
    <Card
      onClick={onClick}
      className="w-full max-w-sm cursor-pointer hover:shadow-lg transition"
    >
      <CardHeader>
        <CardDescription>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              {department.Name}
            </CardTitle>
            <span className="text-sm text-gray-500">
              Order No: {department.OrderNo}
            </span>
          </div>
        </CardDescription>
      </CardHeader>
    </Card>
  );
};
