CREATE TABLE reservations
(
    id               BIGSERIAL PRIMARY KEY,
    accommodation_id BIGINT       NOT NULL,
    user_id          BIGINT       NOT NULL,
    status           VARCHAR(255) NOT NULL,
    created_at       TIMESTAMP    NOT NULL,
    updated_at       TIMESTAMP    NOT NULL,
    FOREIGN KEY (accommodation_id) REFERENCES accommodations (id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

CREATE INDEX idx_reservations_accommodation_id ON reservations(accommodation_id);
CREATE INDEX idx_reservations_user_id ON reservations(user_id);
