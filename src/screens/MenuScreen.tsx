import axios from "@/lib/axios";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
  }, [selectedDepartment]);

  useEffect(() => {
    if (selectedItemGroup) {
      console.log("Selected item group:", selectedItemGroup);
    }
  }, [selectedItemGroup]);

  return (
    <Dialog
      open={!!selectedDepartment}
      onOpenChange={() => setSelectedDepartment(undefined)}
    >
      <ul className="grid grid-cols-2 gap-4">
        {masterfiles.departments.map((department) => (
          <li
            key={department.ID}
            className="p-4 bg-white shadow rounded cursor-pointer"
            onClick={() => setSelectedDepartment(department)}
          >
            <p className="font-semibold">{department.Name}</p>
          </li>
        ))}
      </ul>

      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{selectedDepartment?.Name}</DialogTitle>
          <DialogDescription>Items under this department</DialogDescription>
        </DialogHeader>

        <ul className="space-y-2 mt-4">
          {selectedItemGroup.length === 0 && (
            <p className="text-sm text-muted-foreground">No items found.</p>
          )}
          {selectedItemGroup.map((item) => (
            <li
              key={item.ID}
              className="border rounded p-3 hover:bg-muted transition"
            >
              <p className="font-medium">{item.Description}</p>
              <p className="text-sm text-gray-500">₱{item.Price.toFixed(2)}</p>
            </li>
          ))}
        </ul>
      </DialogContent>
    </Dialog>
  );
}
