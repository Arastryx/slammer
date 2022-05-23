import { Button } from "antd";
import React from "react";
import { Stack } from "../Common/Stack";
import { SlamElementDefinition } from "./SlamXML/slam";
import styles from "./Home.module.css";
import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export interface HomeProps {
  definitions: SlamElementDefinition[];
}

export const Home: React.FC<HomeProps> = ({ definitions }) => {
  return (
    <div>
      <Link to="/import-def">
        <Button type="primary" size="large" icon={<UploadOutlined />}>
          Import Definition
        </Button>
      </Link>
      <div className={styles.header}>Or select a file type</div>
      <Stack direction="vertical" gap={20}>
        {definitions.map((d) => (
          <Link key={d.name} to={`/editor/${d.name}`}>
            <Button type="primary" size="large" icon={<PlusOutlined />}>
              {d.name}
            </Button>
          </Link>
        ))}
      </Stack>
    </div>
  );
};
