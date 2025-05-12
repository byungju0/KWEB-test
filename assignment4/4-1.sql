CREATE table student (
    name VARCHAR(20) NOT NULL,
    year YEAR NOT NUll,
    major VARCHAR(8) NOT NULL,
    num INT NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address VARCHAR(20) NOT NULL,
    totalCredits INT DEFAULT 0,
    averageScore DOUBLE DEFAULT 0.0,
    isEnrolled TINYINT(1) DEFAULT 1
);