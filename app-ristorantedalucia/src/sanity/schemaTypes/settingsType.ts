import { CogIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const settingsType = defineType({
  name: "settings",
  title: "Settings",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "theme",
      title: "Theme",
      type: "string",
      options: {
        list: [
          { title: "Light", value: "light" },
          { title: "Dark", value: "dark" },
          { title: "Cream", value: "cream" },
          { title: "Auto (System Preference)", value: "auto" },
        ],
        layout: "radio",
      },
      initialValue: "light",
    }),
  ],
});
