import { Stethoscope } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
            <Stethoscope className="h-8 w-8 animate-pulse text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold">
            <div className="mx-auto h-8 w-48 animate-pulse rounded-md bg-gray-200"></div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="mx-auto h-5 w-32 animate-pulse rounded-md bg-gray-200"></div>
          </div>

          <div className="h-12 w-full animate-pulse rounded-md bg-gray-200"></div>
        </CardContent>
      </Card>
    </div>
  );
}
