import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "app/components/ui/tabs";

const CommunitiesList = () => {
  return (
    <div className="max-w-[400px]">
      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="followed">Followed</TabsTrigger>
        </TabsList>
        <TabsContent value="all">All</TabsContent>
        <TabsContent value="followed">Followed</TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunitiesList;
