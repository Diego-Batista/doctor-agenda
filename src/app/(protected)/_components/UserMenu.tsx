"use client";

import { EditIcon, LogOut } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";

export function UserMenu() {
  const router = useRouter();
  const session = authClient.useSession();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/authentication");
        },
      },
    });
  };

  const handleEditClinic = () => {
    router.push("/clinic-settings");
  };

  if (!session.data) {
    // Enquanto não tiver sessão carregada, não renderiza nada
    return null;
  }

  const clinicInitials = session.data.user.clinic?.name
    .split(" ")
    .map((name) => name[0])
    .join("");

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton size="lg">
                <Avatar className="mr-3 h-12 w-12">
                  {session.data.user.clinic?.imageUrl ? (
                    <Image
                      src={session.data.user.clinic?.imageUrl}
                      alt={`Logo da clínica. ${session.data.user.clinic?.name}`}
                      fill
                      className="rounded-full object-cover"
                    />
                  ) : (
                    <AvatarFallback className="text-2xl">
                      {clinicInitials}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div>
                  <p className="text-sm">{session.data.user.clinic?.name}</p>
                  <p className="text-muted-foreground text-sm">
                    {session.data.user.email}
                  </p>
                </div>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={handleEditClinic}>
                <EditIcon />
                Editar
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut />
                Sair
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
