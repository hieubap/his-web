import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Main } from "./styled";
import { Card, List, Empty } from "antd";
import { useTranslation } from "react-i18next";
const Rooms = ({ rooms, roomId, onSelectRoom }) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (rooms && rooms.length) {
      onSelectRoom({ roomId: rooms[0].id });
    }
  }, [rooms]);
  const selecRoom = (roomId) => {
    onSelectRoom({ roomId });
  };
  return (
    <Main>
      <Card
        title={t("drugDistributions.room")}
        bordered={false}
        className={`card-container ${ !rooms.length && 'empty'}`}
      >
        {rooms && rooms.length ? (
          <List
            itemLayout="horizontal"
            dataSource={rooms}
            className="scroll-container"
            renderItem={(item) => (
              <List.Item
                id={`room_${item.id}`}
                className={`room-item ${
                  roomId === item.id ? "selected-room" : ""
                }`}
                onClick={() => selecRoom(item.id)}
              >
                <List.Item.Meta title={<span>{item.name}</span>} />
                {/* <Radio value={item.id}/> */}
              </List.Item>
            )}
          />
        ) : (
          <Empty description={t("drugDistributions.noData")} />
        )}
      </Card>
    </Main>
  );
};

const mapState = (state) => ({
  rooms: state.room.rooms || [],
  roomId: state.patientRoom.roomId,
});

const mapDispatch = ({
  patientRoom: { onSelectRoom },
}) => ({
  onSelectRoom,
});

export default connect(mapState, mapDispatch)(Rooms);
