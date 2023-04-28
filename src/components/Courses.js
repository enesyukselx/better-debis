import Course from "./Course";

const Courses = ({ data, semester }) => {
    return (
        <ul>
            {data.map((course) => (
                <Course
                    key={course.value}
                    value={course.value}
                    text={course.text}
                    semester={semester}
                />
            ))}
        </ul>
    );
};

export default Courses;
