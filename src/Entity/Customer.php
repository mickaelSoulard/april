<?php

namespace App\Entity;

use App\Repository\CustomerRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CustomerRepository::class)]
class Customer
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;
	#[ORM\Firstname]
    #[ORM\GeneratedValue]
    #[ORM\Column]
	private $firstname;
	#[ORM\Lastname]
    #[ORM\GeneratedValue]
    #[ORM\Column]
	private $lastname;
	#[ORM\Adress]
    #[ORM\GeneratedValue]
    #[ORM\Column]
	private $adress;
	#[ORM\Postcode]
    #[ORM\GeneratedValue]
    #[ORM\Column]
	private $postcode;
	#[ORM\City]
    #[ORM\GeneratedValue]
    #[ORM\Column]
	private $city;
	#[ORM\Email]
    #[ORM\GeneratedValue]
    #[ORM\Column]
	private $email;
	
    public function getId(): ?int
    {
        return $this->id;
    }
	public function getFirstname(): ?string
    {
        return $this->firstname;
    }
	public function setFirstname(string $firstname): self
    {
        $this->firstname = $firstname;
        return $this;
    }
	public function getLastname(): ?string
    {
        return $this->lastname;
    }
	public function setLastname(string $lastname): self
    {
        $this->lastname = $lastname;
        return $this;
    }
	public function getAdress(): ?string
    {
        return $this->adress;
    }
	public function setAdress(string $adress): self
    {
        $this->adress = $adress;
        return $this;
    }
	public function getPostcode(): ?string
    {
        return $this->postcode;
    }
	public function setPostcode(string $postcode): self
    {
        $this->postcode = $postcode;
        return $this;
    }
	public function getCity(): ?string
    {
        return $this->city;
    }
	public function setCity(string $city): self
    {
        $this->city = $city;
        return $this;
    }
	public function getEmail(): ?string
    {
        return $this->email;
    }
	public function setEmail(string $email): self
    {
        $this->email = $email;
        return $this;
    }
}
