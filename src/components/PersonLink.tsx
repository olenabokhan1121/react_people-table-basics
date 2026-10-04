import React from 'react';
import { Link, useParams } from 'react-router-dom';
import cn from 'classnames';
import { Person } from '../types';
type Props = {
  person: Person;
  people: Person[];
};
export const PersonLink: React.FC<Props> = ({ person, people }) => {
  const { slug } = useParams();

  function findParent(parentName: string | null) {
    return people.find(({ name }) => name === parentName);
  }

  const mother = findParent(person.motherName);
  const father = findParent(person.fatherName);
  const isActive = person.slug === slug;

  return (
    <tr data-cy="person" className={cn({ 'has-background-warning': isActive })}>
      <td>
        <Link
          to={`/people/${person.slug}`}
          className={cn({ 'has-text-danger': person.sex === 'f' })}
        >
          {person.name}
        </Link>
      </td>

      <td>{person.sex}</td>
      <td>{person.born}</td>
      <td>{person.died}</td>
      <td>
        {mother ? (
          <Link to={`/people/${mother.slug}`} className="has-text-danger">
            {mother.name}
          </Link>
        ) : (
          person.motherName || '-'
        )}
      </td>
      <td>
        {father ? (
          <Link to={`/people/${father.slug}`}>{father.name}</Link>
        ) : (
          person.fatherName || '-'
        )}
      </td>
    </tr>
  );
};
