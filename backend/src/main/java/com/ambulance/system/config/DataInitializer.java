package com.ambulance.system.config;

import com.ambulance.system.model.ERole;
import com.ambulance.system.model.Role;
import com.ambulance.system.model.User;
import com.ambulance.system.repository.RoleRepository;
import com.ambulance.system.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private RoleRepository roleRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        // Initialize roles first
        initRoles();
        
        // Then create default users with appropriate roles
        createDefaultUsers();
    }
    
    private void initRoles() {
        if (roleRepository.count() == 0) {
            Role userRole = new Role();
            userRole.setName(ERole.ROLE_USER);
            roleRepository.save(userRole);
            
            Role adminRole = new Role();
            adminRole.setName(ERole.ROLE_ADMIN);
            roleRepository.save(adminRole);
            
            Role paramedicRole = new Role();
            paramedicRole.setName(ERole.ROLE_PARAMEDIC);
            roleRepository.save(paramedicRole);
            
            System.out.println("Roles initialized successfully.");
        }
    }
    
    private void createDefaultUsers() {
        // Check if admin user exists, create if not
        if (!userRepository.existsByUsername("admin")) {
            User adminUser = new User();
            adminUser.setUsername("admin");
            adminUser.setEmail("admin@example.com");
            adminUser.setPassword(passwordEncoder.encode("admin123"));
            adminUser.setFirstName("Admin");
            adminUser.setLastName("User");
            adminUser.setPhoneNumber("123456789");
            
            // Set admin role
            Set<Role> adminRoles = new HashSet<>();
            Optional<Role> adminRoleOpt = roleRepository.findByName(ERole.ROLE_ADMIN);
            if (adminRoleOpt.isPresent()) {
                adminRoles.add(adminRoleOpt.get());
                // Add user role as well to ensure all privileges
                Optional<Role> userRoleOpt = roleRepository.findByName(ERole.ROLE_USER);
                userRoleOpt.ifPresent(adminRoles::add);
                
                adminUser.setRoles(adminRoles);
                userRepository.save(adminUser);
                System.out.println("Admin user created successfully.");
            } else {
                System.out.println("Error: Admin role not found.");
            }
        }
        
        // Check if paramedic user exists, create if not
        if (!userRepository.existsByUsername("paramedic")) {
            User paramedicUser = new User();
            paramedicUser.setUsername("paramedic");
            paramedicUser.setEmail("paramedic@example.com");
            paramedicUser.setPassword(passwordEncoder.encode("paramedic123"));
            paramedicUser.setFirstName("Paramedic");
            paramedicUser.setLastName("User");
            paramedicUser.setPhoneNumber("987654321");
            
            // Set paramedic role
            Set<Role> paramedicRoles = new HashSet<>();
            Optional<Role> paramedicRoleOpt = roleRepository.findByName(ERole.ROLE_PARAMEDIC);
            if (paramedicRoleOpt.isPresent()) {
                paramedicRoles.add(paramedicRoleOpt.get());
                // Add user role as well to ensure all privileges
                Optional<Role> userRoleOpt = roleRepository.findByName(ERole.ROLE_USER);
                userRoleOpt.ifPresent(paramedicRoles::add);
                
                paramedicUser.setRoles(paramedicRoles);
                userRepository.save(paramedicUser);
                System.out.println("Paramedic user created successfully.");
            } else {
                System.out.println("Error: Paramedic role not found.");
            }
        }
    }
} 